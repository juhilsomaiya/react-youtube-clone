import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList'
import VideoDetails from './VideoDetails'
const KEY = 'AIzaSyBki6mlFvCAeCXgU_NHzxaUdpyi1cxUKwk';


class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    }

    componentDidMount() {
        // to have a default search
        this.onTermSubmit('react js')
    }

    onTermSubmit = async inputSearch => {
        const response = await youtube.get('/search', {
            params: {
                key: KEY,
                part: 'snippet',
                q: inputSearch,
                maxResults: 5,
            }
        });

        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });
    };

    onVideoSelect = video => {
        this.setState({
            selectedVideo: video
        })
    }

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetails video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList onVideoSelect={this.onVideoSelect}
                                videos={this.state.videos} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
