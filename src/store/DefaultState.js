import { v4 as uuidv4 } from "uuid";
export default {
    project(){
        return {
            name: null,
            url: null,
            description: null,
            properties: [],
            created: false,
            bounties:[]
        
        }
    },
    profile(){
        return {
            initialized: false,
            localDb: false,
            info: {
              name: '',
              email: ''
            },
            defaultSettings:{
                bounty:{
                    amount: 10,
                    increment: null,
                    incrementDisabled: false,
                    incrementPeriod: null,
                    incrementPeriodSize: null,
                    reviewAmount: null,
                    reviewAmountDisabled: false,
                    adminAmount: null,
                    adminAmountDisabled: false,
                    submitterAmount: null,
                    submitterAmountDisabled: false,
                    issueUrl: null,
                    level: null,
                    complexity: null,
                }
            }
          }
    },
    bounty(){
        return {
            uuid: uuidv4(),
            name : null,
            description: null,
            amount: null,
            increment: null,
            incrementDisabled: false,
            incrementPeriod: null,
            incrementPeriodSize: null,
            reviewAmount: null,
            reviewAmountDisabled: false,
            adminAmount: null,
            adminAmountDisabled: false,
            submitterAmount: null,
            submitterAmountDisabled: false,
            issueUrl: null,
            level: null,
            complexity: null,
            created: null,
            updated: null,
            state: {
                open: true,
                initiated: false,
                closed: false,
            },
            properties: {}
        }
    },
}