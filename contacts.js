import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
console.log(contactsPath);
 
export const getListContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

export const getContactById = async (id) => {
  const contacts = await getListContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

export const addContact = async (data) => {
  const contacts = await getListContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export const  removeContact = async (id) => {
  const contacts = await getListContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;

}

