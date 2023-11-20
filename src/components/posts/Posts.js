import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';
class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '', // State variable to hold the search query
        };
    }

    componentDidMount() {
        // Load posts when the component mounts
        this.props.getPosts();
    }

    // Method to handle changes in the search input
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // Method to handle form submission
    onSubmit = (e) => {
        e.preventDefault();
        // Call the getPosts action with the search query
        this.props.getPosts(this.state.search);
    };

    render() {
        const { posts, loading } = this.props.post;
        let postContent;

        if (posts === null || loading) {
            postContent = <Spinner />;
        } else {
            postContent = <PostFeed posts={posts} />;
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/* Search Bar */}
                            <form onSubmit={this.onSubmit} className="mb-4">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                        name="search"
                                        value={this.state.search}
                                        onChange={this.onChange}
                                    />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-primary">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        
                            {/* Post Form */}
                            <PostForm />
                            <br />
                            {/* Post Content */}
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);