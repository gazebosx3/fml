import React from 'react'
import axios from 'axios'

export default class SubmitPick extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      artist: '',
      value: 0
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleArtistChange = this.handleArtistChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }
  handleArtistChange(event) {
    this.setState({artist: event.target.value})
  }
  handleValueChange(event) {
    this.setState({value: event.target.value})
  }

  async handleSubmit(event) {
    if (!this.state.artist || !this.state.title || !this.state.value) {
      alert('Make sure there are values for all fields')
    } else {
      const {id: songId} = await axios.get(
        `/songs/getSong?title=${title}&artist=${artist}`
      )

      const {artist, title} = this.state
      const body = {
        songId,
        value: this.state.value,
        userId: this.props.id
      }
      axios
        .post('/picks/createPick', body)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            value={this.state.artist}
            onChange={this.handleArtistChange}
          />
        </label>
        <label>
          Score:
          <input
            type="number"
            value={this.state.value}
            onChange={this.handleValueChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    )
  }
}
