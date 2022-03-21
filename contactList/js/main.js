import { createClientsHeader } from "./createHeader.js";
import { createClientsSection } from "./createClientsSection.js";
import { getClients } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { searchClient } from "./searchClient.js";
import { sortTable } from "./sortClientsTable.js";

const createApp = async() => {
    const header = createClientsHeader();
    const clientSection = createClientsSection();
    document.body.append(header, clientSection.main);
    const preloader = document.querySelector('.preloader');
    const wrapperTable = document.querySelector('.clients__wrapper');

    try {

        const clients = await getClients();
        searchClient(clients)

        for (const client of clients) {
            document.querySelector('.clients__tbody').append(createClientItem(client))
        }
    } catch (error) {
        console.log(error);
    } finally {
        // setTimeout(() => preloader.remove(), 1500);
        preloader.remove()
        wrapperTable.style.overflow = 'auto'
    }

}

createApp();
document.addEventListener('DOMContentLoaded', sortTable);