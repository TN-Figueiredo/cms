import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// Components
import NewArticle from "../../../containers/Dashboard/NewArticle/NewArticle";

// Actions
import * as actionTypes from "../../../store/actions/index";

class Articles extends Component {
    state = {
        section: null
    };

    componentWillMount() {
        this.props.onFetchAllArticles();
    }

    handleClick = section => {
        this.setState({ section: section });
    };

    render() {
        // Create variable to load articles
        let loadArticles = null;
        this.props.article.article
            ? loadArticles = this.props.article.article.map(article => (
                  <tr key={article.id}>
                      <td>{article.title}</td>
                      <td>{article.author}</td>
                      <td>{article.posted_at}</td>
                  </tr>
              ))
            : null;

        // Create Variable that will hold article section to render
        let articleToRender = null;
        if (this.state.section === "newArticle") {
            articleToRender = <NewArticle />;
        } else {
            articleToRender = (
                <Fragment>
                    <div className="card-header main-color-bg">Articles</div>
                    <div className="card-body">
                        <div className="card-deck">
                            <div
                                onClick={() => this.handleClick("newArticle")}
                                className="card dash-box"
                            >
                                <div className="card-body">
                                    <h2>New Article</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header main-color-bg">
                            All Articles
                        </div>
                        <div className="card-body">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Posted Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadArticles}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Fragment>
            );
        }

        return <Fragment>{articleToRender}</Fragment>;
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
