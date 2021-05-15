import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SubmitSong from './submit-song'
import SubmitPick from './submit-pick'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, id, name} = props

  return (
    <div>
      <h3>Welcome, {name} </h3>

      <h5>Submit a song</h5>
      <SubmitSong id={id} />

      <h5>Submit a pick</h5>
      <SubmitPick id={id} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
