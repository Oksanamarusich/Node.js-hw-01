import { program } from "commander";
import * as contactsService from "./contacts.js";

const invokeAction = async ({action, id, ...data}) => {
    switch (action) {
        case "list":
            const listContacts = await contactsService.getListContacts();
            console.table(listContacts);
            break;
        case "get":
            const contact = await contactsService.getContactById(id);
            console.log(contact);
            break;
        case "add":
            const newContact = await contactsService.addContact(data);
            console.log(newContact);
            break;
        case "remove":
            const removeContact = await contactsService.removeContact(id);
            console.log(removeContact);
            break;

}
}

program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-n, --name <type>")
    .option("-e, --email <type>")
    .option("-p, --phone <type>")

program.parse();

const options = program.opts();
invokeAction(options);
        


