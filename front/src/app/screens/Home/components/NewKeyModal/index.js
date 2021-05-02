import { bool, func } from 'prop-types';
import React, { useState } from 'react';

import CustomModal from '~app/components/CustomModal';
import Input from '~app/components/Input';
import Button from '~app/components/Button';
import { MODALS } from '~redux/Modal/constants';

import styles from '../../styles.module.scss';

function NewKeyModal({ handleConfirm, isOpen }) {
  const [value, setValue] = useState('');
  const handleKeyChange = e => setValue(e.target.value);
  console.log(value);
  return (
    <CustomModal className={styles.modalContainer} modal={MODALS.NEW_KEY} isOpen={isOpen}>
      <div className="full-width full-height column">
        <span className="subtitle m-bottom-4">New Key Value</span>
        <Input onChange={handleKeyChange} value={value} />
        <Button onClick={handleConfirm(value)} className={styles.modalButton}>
          Confirm
        </Button>
      </div>
    </CustomModal>
  );
}

NewKeyModal.propTypes = {
  handleConfirm: func.isRequired,
  isOpen: bool
};

export default NewKeyModal;
