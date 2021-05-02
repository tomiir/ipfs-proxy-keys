import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~app/components/Button';
import Checkbox from '~app/components/Checkbox';
import ModalActions from '~redux/Modal/actions';
import PageLogo from '~assets/ipfs-logo.svg';
import { MODALS } from '~redux/Modal/constants';

import NewKeyModal from './components/NewKeyModal';
import styles from './styles.module.scss';

function Home() {
  const dispatch = useDispatch();
  const [keys, setKeys] = useState([]);
  const modalOpen = useSelector(state => state.modal[MODALS.NEW_KEY]);
  const openModal = () => dispatch(ModalActions.openModal(MODALS.NEW_KEY));
  const closeModal = () => dispatch(ModalActions.closeModal(MODALS.NEW_KEY));
  const addNewKey = value => () => {
    setKeys([...keys, { active: false, value }]);
    closeModal();
  };

  return (
    <div className={`full-height full-width ${styles.screenContainer}`}>
      <div className="row middle space-between m-bottom-4">
        <div className="row middle">
          <img className={`m-right-2 ${styles.ipfsLogo}`} src={PageLogo} alt="zerf-icon" />
          <h1 className="title bold">IPFS Proxy Key Manager</h1>
        </div>
        <Button className={styles.keysButton} onClick={openModal}>
          <span>Create API KEY</span>
        </Button>
      </div>
      <div className={styles.keysContainer}>
        {keys.map(aKey => (
          <div className={styles.keyContainer} key={aKey.value}>
            <h2 className="large-text">{aKey.value}</h2>
            <Checkbox checked={aKey.active} />
            <Button className={styles.dropButton}>
              {/* <img className={styles.dropIcon} src={ArrowDown} /> */}
            </Button>
          </div>
        ))}
      </div>
      <NewKeyModal isOpen={modalOpen} handleConfirm={addNewKey} />
    </div>
  );
}

export default Home;
