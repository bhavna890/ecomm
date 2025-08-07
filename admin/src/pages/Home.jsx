import React from "react";
import Layout from "../component/Layout";
import withAuth from "../component/withAuth";

const Home = () =>{
    return (
       <Layout> 
        <div> Home page</div>
        </Layout>
    )
}

export default withAuth(Home);