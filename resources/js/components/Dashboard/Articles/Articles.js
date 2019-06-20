import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// Components
import NewArticle from "../../../containers/Dashboard/NewArticle/NewArticle";

// Actions
import * as actionTypes from "../../../store/actions/index";

class Articles extends Component {
    state = {
        section: "newArticle"
    };

    componentWillMount() {
        this.props.onFetchAllArticles();
    }

    render() {
        let articleToRender = null;

        if (this.state.section === "newArticle") {
            articleToRender = <NewArticle />;
        } else {
            articleToRender = (
                <Fragment>
                    <div className="card-header main-color-bg">Articles</div>
                    <br />
                    New Post, etc
                    <br />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <div className="">{articleToRender}</div>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ auth, article }) => {
    return {
        auth: auth,
        article: article
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAllArticles: () => dispatch(actionTypes.fetchAllArticles())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Articles);
