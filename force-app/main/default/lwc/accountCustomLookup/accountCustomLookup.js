import { api, LightningElement, track, wire } from "lwc";
import searchAuditableAccounts from "@salesforce/apex/AccountLookup.searchAuditableAccounts";

export default class AccountCustomLookup extends LightningElement {

 @api objName;
  @api iconName;
  @api filter = "";
  @api searchPlaceholder = "Search";
  @track selectedName;
  @track records;
  @track isValueSelected;
  @track blurTimeout;
    searchTerm = '';
    @api auditable;
  //css
  @track boxClass =
    "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click";
  @track inputClass = "";
  @wire(searchAuditableAccounts, {
      searchTerm: "$searchTerm",
      myObject:"$objName",
    auditable: "$auditable",
  })
  wiredRecords({ error, data }) {
    if (data) {
      this.error = undefined;
      this.records = data;
    } else if (error) {
      this.error = error;
      this.records = undefined;
    }
  }
  handleClick() {
    this.searchTerm = "";
    this.inputClass = "slds-has-focus";
    this.boxClass =
      "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open";
  }

  onBlur() {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.blurTimeout = setTimeout(() => {
      this.boxClass =
        "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus";
    }, 300);
  }

  onSelect(event) {
    let selectedAccountId = event.currentTarget.dataset.id;
      let selectedName = event.currentTarget.dataset.name;

      //next 2 lines to send the selected account name and id to parent
       const valueSelectedEvent = new CustomEvent("lookupselected", {
      detail: {
        account: selectedAccountId,
        name: selectedName,
      }
    });
    this.dispatchEvent(valueSelectedEvent);
    this.isValueSelected = true;
    this.selectedName = selectedName;
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
    this.boxClass =
      "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus";
      console.log(selectedAccountId);
  }

  handleRemovePill() {
    this.isValueSelected = false;
  }

    onChange(event) {
        this.searchTerm = event.target.value;
  }
}