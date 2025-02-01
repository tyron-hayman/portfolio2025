'use client'
import { createContext, useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from '@apollo/client';

const PageDataContext = createContext<any>([]);

const GetPageData = ({ children } : { children : any }) => {
    const [pageData, setPageData] = useState<any>(null);
    const [cursorState, setCursorState] = useState<string>("");
    const getPageData = gql`
        query NewQuery {
        pages {
            nodes {
                homepage {
                    about {
                    title
                    content
                    }
                    recentWork {
                    content
                    image {
                        mediaItemUrl
                    }
                    role
                    techStack {
                        tech
                    }
                    title
                    url
                    year
                    }
                    testimonialsTitle
                    testimonials {
                    company
                    content
                    image {
                        mediaItemUrl
                    }
                    name
                    }
                    workExperience {
                    company
                    desc
                    role
                    yearFrom
                    yearTo
                    }
                    initialBox {
                    landingImage {
                        mediaItemUrl
                    }
                    mainText
                    }
                    workContent
                    footerContent
                    footerTitle
                    footerEmail
                }
            }
        }
    }`;

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const client = new ApolloClient({
            uri: "https://wp.tyronhayman.me/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { data } = await client.query({ query: getPageData });
            setPageData(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
    }
            
    return (
        <PageDataContext.Provider value={{ pageData, cursorState, setCursorState}}>
          {children}
        </PageDataContext.Provider>
      );
  }


  export default PageDataContext;
  export { GetPageData }
