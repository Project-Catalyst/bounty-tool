<template>
  <div class="section container">
    <b-message>
      <div class="content">
        <p><b>How it works</b><br /></p>
        <p>The proposal-review-tool is designed to work in parallel with the standard way (using the Google Sheet) to offer a better user experience to the process.<br />
        Consider it as an experiment that hopefully can be used as the standard method in the future funds.<br /><br /></p>
        <ol>
          <li>
            Click on the "Start Process" button.
          </li>
          <li>
            On the next screen fill in your details: "IdeaScale username" & "email address".<br />
            Choose an option to start your process:
            <ol type="a" class="mt-0">
              <li>"I want to start the process from the beginning, I don't have a backup file to import". <i>This create a clean review space</i>.</li>
              <li>I want to continue the process, I have a backup file to import". <i>This will allow you to import a previous exported session</i>.</li>
            </ol>
          </li>
          <li>
            Search for and select your proposal(s) (please only review the proposals you are a proposer on, otherwise your reviews will be excluded).<br />If you have multiple proposals, repeat the process for each proposal.
          </li>
          <li>
            Review the CA assessment, if it is acceptable continue with the next assessment.<br />
            If an assessment requires attention from the Community QA participants (vCAs) flag it and provide your reason for doing so (provide a reason is mandatory in case of flagging).<br />
            You can use this space to provide feedback (both positive and constructive criticism) to the CA even without flagging the assessment.
          </li>
          <li>
            When your review is complete from the menu click "Export CSV", save the file.
          </li>
          <li>
            This is the final file that you'll have to share at the end of the QA process. This file file can also be re-imported in the proposal-review-tool to edit/check/continue your reviews.<br />
            Upload the final export to Google Docs, rename it including you proposal title, change the share settings to "Anyone with the link" and fill in <a href="https://forms.gle/Jor2vitCNzpab67Z6" target="_blank">this form</a> with your details and the link to your file.
          </li>
        </ol>
        <p><b>Useful resources</b><br /></p>
        <p>
          <a href="https://docs.google.com/document/d/1NNnIW8Z6XFQ0WEYBOSGv2LsQTN7Goai0omOn0hjL9zk" target="_blank">Proposal Review & Assess QA</a><br />
          <a href="https://docs.google.com/document/d/1g-iZhDlKhUBZkui1uv8NVNfJC4oVD3JtR-P6Fue7XPU" target="_blank">Community Advisor Assessment Guide</a><br />
          <a href="https://t.me/catalystproposers" target="_blank">Catalyst Proposer Telegram chat.</a>
        </p>
      </div>


    </b-message>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  name: "InstructionsView",
  mixins: [],
  data() {
    return {
      csv: null,
      csvHeaders: null,
      localChoice: false
    };
  },
  computed: {
  },
  methods: {

  },
};
</script>

<style lang="scss">
  .special-button {
    max-height: none !important;
    height: auto !important;
  }
</style>
