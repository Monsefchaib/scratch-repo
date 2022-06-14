import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';

export default class ContactEditForm extends LightningElement {
// Expose a field to make it available in the template
    nameField = NAME_FIELD;

    // Flexipage provides recordId and objectApiName
    @api objectApiName;
    @api auditable = false;

 value = [''];

    get options() {
        return [
            { label: 'Auditable', value: 'Auditable' },
        ];
    }

handleChange(e) {
    this.value = e.detail.value;
    this.auditable = !this.auditable;
    }
}