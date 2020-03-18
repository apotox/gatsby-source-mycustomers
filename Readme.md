## gatsby-source-mycustomers

import list customers from an API


<p align="center"> 
    <img src="https://travis-ci.org/apotox/gatsby-source-mycustomers.svg?branch=master">
</p>

### Installation
```shell
    #NPM
    npm i --save gatsby-source-mycustomers
    #YARN
    yarn add gatsby-source-mycustomers

```


### use in  gatsby-config.js

```javascript
    plugins: [
        //...
        {
            resolve:'gatsby-source-mycustomers',
            options:{
                //...
            }
        }
    ]
    
```

### query all customers from your store using GraphQL
```javascript

   exports.createPages = async ({ graphql, actions }) => {

    const { createPage } = actions;
    const postTempalte = path.resolve("./src/templates/post.js");

    return graphql(`
    query {
        allCustomers {
            edges {
              node {
                avatar
                name
                id
              }
            }
        }
    }
  `).then(result => {

        let alledges = result.data.allSaphy.edges
        alledges.forEach(({ node }) => {
            createPage({
                path: _.kebabCase(node.name),
                id: node.id,
                component: postTempalte,
                context: {
                    id: node.id
                }
            })
        })
    })

}

```
