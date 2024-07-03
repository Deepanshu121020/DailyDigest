// import React, { Component } from 'react'
// import NewItem from './NewItem';
// import Loading from './Loading.js';
// import InfiniteScroll from "react-infinite-scroll-component";
// import PropTypes from 'prop-types'
// // import {default} from '@testing-library/user-event'

// export class News extends Component {
//     static defaultProps = {
//         country: 'in',
//         pageSize: 8,
//         category: 'general'
//     }

//     static propTypes = {
//         country: PropTypes.string,
//         pageSize: PropTypes.number,
//         category: PropTypes.string
//     }
//     constructor(props) {
//         super(props);
//         this.state = {
//             articles: [],
//             loading: false,
//             page:1
//         }
//         document.title = `DailyDigest - ${this.capitalizeFirstLetter(props.category)}`;
//     }

//     capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }


//     async componentDidMount(){
//         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f79e5242dabf497bb483eaa435d56a84&page=1&pageSize=${props.pageSize}`;
//         this.setState({loading:true})
//         let data = await fetch(url);
//         let parsedData =  await data.json()
//         this.setState({
//             articles:parsedData.articles,
//             totalResults: parsedData.totalResults,
//             loading: false,
//             totalResults: 0
//         })
//     }



//     fetchMoreData = async() => {
//         this.setState({page: this.state.page+1})
//         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f79e5242dabf497bb483eaa435d56a84&page=1&pageSize=${props.pageSize}`;
//         this.setState({loading:true})
//         let data = await fetch(url);
//         let parsedData =  await data.json()
//         this.setState({
//             articles:this.state.articles.concat(parsedData.articles),
//             totalResults: parsedData.totalResults,
//             loading: false,
//             totalResults: 0
//         })
//     };

//     // handlePrevButton = async()=> {
//     //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=f79e5242dabf497bb483eaa435d56a84&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
//     //     this.setState({loading:true})
//     //     let data = await fetch(url);
//     //     let parsedData =  await data.json()
//     //     this.setState({
//     //         articles:parsedData.articles,
//     //         page:this.state.page-1,
//     //         loading: false
//     //     })
//     // }

//     // handleNextButton = async()=> {
//     //     if (!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))){
//     //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=f79e5242dabf497bb483eaa435d56a84&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
//     //     this.setState({loading:true})
//     //     let data = await fetch(url);
//     //     let parsedData =  await data.json()
//     //     this.setState({
//     //         articles:parsedData.articles,
//     //         page:this.state.page+1,
//     //         loading:false
//     //     })
//     //     }
//     // }
//     render() {
//         return (
//             <div className='container my-3'>
//                 <h1 className='text-center my-3' style={{margin: "40px 0px"}}> {`Daily Digest - ${this.capitalizeFirstLetter(props.category)}`}</h1>

//                 <InfiniteScroll
//                 dataLength={this.state.articles.length}
//                 next={this.fetchMoreData}
//                 hasMore={this.state.articles.length !== this.state.totalResults}
//                 loader={<Loading/>}
//                 >
//                 {/* {this.state.loading&&<Loading/>} */}
//                 <div className='row my-3'>
//                     {/* {!this.state.loading && */}

//                         {this.state.articles.map((element) => { 
//                         return <div className='col-md-4' 
//                                 key={element.url}>
//                                 <NewItem
//                                 title={element.title}
//                                 description={element.description}
//                                 imageUrl={element.urlToImage}
//                                 newsUrl={element.url} 
//                                 author={element.author}
//                                 date={element.publishedAt}
//                                 />
//                         </div>
//                     })}
//                     </div>
//                     </InfiniteScroll>

//                     {/* 
//                     <div className='container d-flex justify-content-between'>
//                     <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevButton} className="btn btn-dark"> &larr; Previous</button>
//                     <button disabled={(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))} type="button" onClick={this.handleNextButton} className="btn btn-dark">Next &rarr;</button>
//                     </div> 
//                     */}

//                 </div>
//         )
//     }
// }

// export default News;


import React, { useEffect, useState } from 'react';
import NewItem from './NewItem';
import Loading from './Loading.js';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types';

const News = ({ category = 'general', pageSize = 8, country = 'in', setProgress }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        document.title = `DailyDigest - ${capitalizeFirstLetter(category)}`;
        fetchArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const fetchArticles = async () => {
        // const { country, category, pageSize, setProgress } = props;
        setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f79e5242dabf497bb483eaa435d56a84&page=${page}&pageSize=${pageSize}`;
        setLoading(true);
        const data = await fetch(url);
        setProgress(40);
        const parsedData = await data.json();
        setProgress(70);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        setProgress(100);
    };

    const fetchMoreData = async () => {
        // const { country, category, pageSize } = props;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f79e5242dabf497bb483eaa435d56a84&page=${page + 1}&pageSize=${pageSize}`;
        setPage(page + 1);
        setLoading(true);
        const data = await fetch(url);
        const parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };

    return (
        <div className='container ' >
            <h1 className='text-center ' style={{ margin: "40px 0px", marginTop: "80px" }}>
                {`Daily Digest - ${capitalizeFirstLetter(category)}`}
            </h1>
            {loading && <Loading />}
            <InfiniteScroll style={{overflow:"hidden"}}
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Loading />}
            >
                <div className='row '>
                    {articles.map((element) => (
                        <div className='col-md-4' key={element.url}> 
                            <NewItem
                                title={element.title}
                                description={element.description}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                            />
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired
};

export default News;
