import React from 'react'
import { useEffect, useState } from "react";
import Cards from "./Cards";
import TextField from '@mui/material/TextField';
import styles from "./Search.module.css"
import LinearProgress from '@mui/material/LinearProgress';
import img from "../Image/Screenshot (375).png"

export const Search = () => {
    // using useState hooks to store our data and update it later
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");

    // handle the onclick event of button 
    const handleClick = () => {
        setText("");
    }

    // fetching the data from API and making it asynchronous
    const CoinDetails = async () => {
      try {
        const data = await fetch(
          "https://comms.globalxchange.com/coin/vault/get/all/coins"
        );
        const result = await data.json();
        setData(result.coins);
        console.log(result.coins);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    
    // this will run once after everything renders in the program and call the function to store the data.
    useEffect(() => {
      CoinDetails();
    }, []);

    // til the time data will not load the loading progress will be shown
    if (loading) {
      return (
                    <LinearProgress color="inherit" />
            )
        }
  
    return (
        <div className={styles.searchWrapper}>
              <img src={img} alt="" className={styles.bankerTag}/>
              <hr/>
              <div className={styles.scroll}>
                <div className={styles.label}>
                  <span><b>Select Display Currency</b></span>
                  <input
                      type="text"
                      placeholder='Search Currencies...'
                      value={text}
                      onChange={(e) => setText(e.currentTarget.value)}
                  />
                  </div>
                <div className={styles.cardWrapper}>
                        {/* everytime the text will change this will filter out the coin name which contains same coin name as text*/}
                  {data?.filter((item) => {
                    if (text === "") {
                      return item;
                    } 
                    else if (
                      item.coinName
                      .toLowerCase()
                      .split(" ")
                      .join("")
                      .includes(text.toLowerCase()) ||
                    item.coinSymbol.toLowerCase().includes(text.toLowerCase())
                    ) {
                        return item;
                      }
                    })
                  .map((item) => {
                    return (
                      <Cards
                        keyId={item._id}
                        image={item.coinImage}
                        imgName={item.coinName}
                        price={item.usd_price}
                        name={item.coinName}
                      />
                      )
                    }
                  )}
                </div>
              </div>
                        {/* this button will reset the text to an empty string and whole data will be shown again */}
            <div className={styles.resetBtn} onClick={handleClick}>Reset To USD</div>
        </div>
    )
}
