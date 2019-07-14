import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

const LoadingModal = ({ loadingConcerts }) => {
  if (loadingConcerts) {
    return (
      <div className='modal loading-modal fade in show'>
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <div className='d-flex justify-content-center'>
                <h5>Finding Concerts...</h5>
              </div>
              <br />
              <div className='d-flex justify-content-center'>
                <FontAwesomeIcon icon={faCompactDisc} size='4x' spin />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  return {
    loadingConcerts: state.loadingConcerts
  };
};

export default connect(mapStateToProps)(LoadingModal);
