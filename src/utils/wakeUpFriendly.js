import fetch from "node-fetch";

const wakeUpFriendly = (url, interval = 5, callback) => {
  const milliseconds = interval * 60000;
  setTimeout(() => {
    try { 
      console.log("Wake up function scalled.");
      fetch(url).then(() => console.log(`Fetching ${url}.`)); 
    }
    catch (err) {
      console.log(`Error fetching ${url}: ${err.message} 
        Will try again in ${interval} minutes...`);
    }
    finally {
      try {
        callback();
      }
      catch (e) {
        callback ? console.log(`Callback failed: ${e.message}`) : null;
      }
      finally {
        return wakeUpFriendly(url, interval, callback);
      }
    }
  }, milliseconds);
};

export default wakeUpFriendly;