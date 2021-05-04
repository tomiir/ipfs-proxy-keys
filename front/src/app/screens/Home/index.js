import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~app/components/Button';
import ModalActions from '~redux/Modal/actions';
import PageLogo from '~assets/ipfs-logo.svg';
import { MODALS } from '~redux/Modal/constants';
import { actionCreators } from '~redux/Keys/actions';

import NewKeyModal from './components/NewKeyModal';
import styles from './styles.module.scss';
import ApiKeys from './components/ApiKeys';

function Home() {
  const dispatch = useDispatch();
  const { keys, keysLoading } = useSelector(state => state.keys);
  const modalOpen = useSelector(state => state.modal[MODALS.NEW_KEY]);

  const openModal = () => dispatch(ModalActions.openModal(MODALS.NEW_KEY));
  const closeModal = () => dispatch(ModalActions.closeModal(MODALS.NEW_KEY));

  const addNewKey = value => () => {
    dispatch(actionCreators.createKey({ value }));
    closeModal();
  };

  useEffect(() => {
    dispatch(actionCreators.getKeys());
  }, []);
  const toggleKey = key => () => dispatch(actionCreators.updateKey({ ...key, active: !key.active }));
  return (
    <div className={`full-width ${styles.screenContainer}`}>
      <div className="row middle space-between m-bottom-6">
        <div className="row middle">
          <img className={`m-right-2 ${styles.ipfsLogo}`} src={PageLogo} alt="zerf-icon" />
          <h1 className="title bold">IPFS Proxy Key Manager</h1>
        </div>
        <Button className={styles.keysButton} onClick={openModal}>
          <span>Create API KEY</span>
        </Button>
      </div>
      <ApiKeys keys={keys} toggleKey={toggleKey} loading={keysLoading} />
      <NewKeyModal isOpen={modalOpen} handleConfirm={addNewKey} />
    </div>
  );
}

export default Home;
