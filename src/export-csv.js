/* eslint-disable no-unused-vars */
import { Parser } from "json2csv";
import FileSaver from "file-saver";
import slugify from "slugify";
import _ from 'lodash';

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
function generateField(object, key, prefix = "") {
    const type = typeof object[key] === 'object' ? 'string' : typeof object[key]
    let label = ""
    if (prefix.length > 0) {
        label = label + capitalize(prefix).replaceAll('_', ' ')
    }
    label = label + capitalize(key).replace(/[A-Z]/g, " $&").trim()

    return {
        name: `${prefix}${key}`,
        config: {
            'value': type,
            'label': label
        }
    }
}
const PROJECT_PREFIX = "project_"
const PROPERTY_PREFIX = "property_"
const generateHeaders = function (project) {
    const csvHeaders = []
    Object.keys(project).forEach(key => {
        if (key === 'bounties') return
        const field = generateField(project, key, PROJECT_PREFIX)
        csvHeaders[field.name] = Object.assign({}, field.config)
    })

    if (project.bounties.length > 0) {
        const bounty = project.bounties[0]
        Object.keys(bounty).forEach(key => {
            if (key === 'properties') return
            const field = generateField(bounty, key)
            csvHeaders[field.name] = Object.assign({}, field.config)
        })

        project.bounties.forEach(bounty => {
            Object.keys(bounty.properties).forEach(key => {
                //We chack if property still exists, otherwise import will fail to validate
                if (project.properties.filter(prop => prop.uuid === key).length > 0) {
                    const field = generateField(bounty.properties, key, PROPERTY_PREFIX)
                    if (Object.keys(csvHeaders).indexOf(field.name) < 0) {
                        csvHeaders[field.name] = Object.assign({}, field.config)
                    }
                }
            })
        })

    }
    return csvHeaders
}
const generateData = function (project, csvHeadersKeys) {
    return project.bounties.map((bounty) => {
        let row = {}
        csvHeadersKeys.forEach(header => {
            var value = null
            if (header.startsWith(PROJECT_PREFIX)) {
                if (typeof project[header.replaceAll(PROJECT_PREFIX, '')] === 'object') {
                    value = JSON.stringify(project[header.replaceAll(PROJECT_PREFIX, '')])
                } else {
                    value = project[header.replaceAll(PROJECT_PREFIX, '')]
                }
            } else if (header.startsWith(PROPERTY_PREFIX)) {
                value = bounty.properties[header.replaceAll(PROPERTY_PREFIX, '')]
            } else if (typeof bounty[header] === 'object') {
                value = JSON.stringify(bounty[header])
            } else {
                value = bounty[header]
            }
            row[header] = value
        })
        return row
    });
}

function downloadCsv(project) {
    const filename = project.name + "-bounties.csv";
    const csvHeaders = generateHeaders(project)
    const data = generateData(project, Object.keys(csvHeaders))
    
    if (data.length) {
        const parser = new Parser()
        const csv = parser.parse(data)
        console.log(csv)
        const blob = new Blob([csv], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, slugify(filename));
    }
}

export { downloadCsv }