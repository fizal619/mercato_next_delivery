import axios from "axios";
import cheerio from "cheerio";
import {sleep} from './utils';

const alreadyChecked = [];

const main = async () => {
  return setTimeout(async () => {
    console.log("CHROME EXTENSION");
    const shops = Array.from(document.querySelectorAll(".store-profile-rebrand__name a"))
      .map(nameLink => nameLink);

    if (shops.length === 0) {
      return;
    }

    for (let index = 0; index < shops.length; index++) {
      const shop = shops[index];

      if (alreadyChecked.includes(shop.href)){
        continue;
      }

      try {
        const res = await axios.get(shop.href);
        const html = res.data;
        const $ = cheerio.load(html);
        const time = $(".store-home__filter-bar__msg__next-time").text();
        shop.innerHTML = `${shop.textContent}<p>Next Delivery Slot: <br>${time}</p>`;
        alreadyChecked.push(shop.href);
        await sleep( Math.ceil(Math.random() * 3) );
      } catch (e) {
        console.log("ERROR OCCURED", e);
      }
    }
  }, 10);
}


chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(async () => {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      let scrapeRun = await main();
      let mutationCount = 0;

      const targetNode = document.getElementById("LiveStoreList");
      const config = { attributes: false, childList: true, subtree: false };
      const callback = async (mutationsList) => {
        // Use traditional 'for loops' for IE 11
        for(let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            // console.log("mutation", mutation);
            mutationCount++;
            if ( mutationCount === 9 ){
              clearInterval(scrapeRun);
              scrapeRun = await main();
              mutationCount = 0;
            }
          }
        }
      }
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);
    }
	}, 10);
});