import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
//import { default as config } from "./firebaseConfig";

const firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const style = {
  margin: "auto",
  padding: 8,
  textAlign: "center",
};

const chapters = [
  28,
  20,
  16,
  20,
  15,
  19,
  52,
  63,
  28,
  16,
  16,
  29,
  20,
  25,
  17,
  14,
  36,
];

class App extends React.Component {
  constructor(props) {
    super(props);

    let initialItems = [];
    for (let i = 0; i < chapters.length; i++) {
      for (let j = 1; j <= chapters[i]; j++) {
        initialItems.push(`anime/chap-${i}/${j}.jpg`);
      }
    }

    this.state = {
      items: initialItems,
      hasMore: true,
      chapterNum: 0,
      pageNum: 0,
    };
  }

  fetchMoreData = () => {
    const { items, chapterNum } = this.state;

    if (chapterNum > chapters.length) {
      this.setState({ hasMore: false });
      return;
    }

    if (items.length >= chapters[chapterNum]) {
      this.setState({
        chapterNum: chapterNum + 1,
      });
    }

    this.setState({
      items: items.concat(Array.from({ length: 20 })),
    });
  };

  getChapterNum = (index) => {
    const { chapterNum } = this.state;
    console.log(`index= ${index} chapterNum= ${chapterNum}`);
    if (index % chapters[chapterNum] === 0) {
      this.setState({
        chapterNum: chapterNum + 1,
      });
    }
  };

  nextChapter = () => {
    this.setState({
      chapterNum: this.state.chapterNum + 1,
    });
  };

  render() {
    const { items, chapterNum, hasMore } = this.state;

    console.log(
      `chapterNum: ${chapterNum} 
      chapters.length: ${chapters.length} 
      items.length: ${items.length}`
    );

    return (
      <div>
        <h1>Anime reader</h1>
        <hr />
        <InfiniteScroll
          dataLength={items.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {items.map((item, index) => (
            <div style={style} key={chapterNum + index}>
              {this.getChapterNum(index)}
              <br />
              {index % chapters[chapterNum] === 0
                ? `Chapter #${this.state.chapterNum}`
                : ""}
              <br />
              <img src={item} alt={item} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
