import React, { useState } from 'react';
import cn from 'classnames';
import { bool, func, shape, string } from 'prop-types';

import Arrow from '~assets/arrow.svg';
import Button from '~app/components/Button';
import Checkbox from '~app/components/Checkbox';
import LoadingWrapper from '~app/components/LoadingWrapper';

import styles from './styles.module.scss';

function ApiKeys({ keys, toggleKey, loading }) {
  const [openKey, setOpenKey] = useState();
  const toggleKeypOpen = index => () => (openKey === index ? setOpenKey() : setOpenKey(index));
  return (
    <LoadingWrapper loading={loading}>
      <div className={`column ${styles.keysContainer}`}>
        {keys.map((aKey, index) => (
          <div className={`m-bottom-4 ${styles.keyContainer}`} key={aKey.id}>
            <div className="row bottom space-between m-bottom-4">
              <h2 className="large-text">{aKey.value}</h2>
              <div className="row center bottom">
                <Checkbox
                  label="Active"
                  labelClassName="m-bottom-1 text bold"
                  containerClassName="m-right-6"
                  checked={aKey.active}
                  onChange={toggleKey(aKey)}
                />
                <Button className={styles.dropButton} onClick={toggleKeypOpen(index)}>
                  <img className={cn(styles.dropIcon, { [styles.rotate]: index === openKey })} src={Arrow} />
                </Button>
              </div>
            </div>
            {openKey === index && (
              <div className="column full-width text-center">
                <div className={`row midle space-between ${styles.requestsHeader}`}>
                  <div className="quarter-width large-text bold">TIMESTAMP</div>
                  <div className="quarter-width large-text bold">URL</div>
                  <div className="quarter-width large-text bold">METHOD</div>
                  <div className="quarter-width large-text bold">SIZE</div>
                </div>
                {aKey.requests && (
                  <div className={`column full-width ${styles.requestsBody}`}>
                    {aKey.requests.map(req => (
                      <div key={req.timestamp} className={`row middle full-width ${styles.request}`}>
                        <div className="quarter-width text">{req.timestamp}</div>
                        <div className="quarter-width text">{req.url}</div>
                        <div className="quarter-width text">{req.method}</div>
                        <div className="quarter-width text">{req.size}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </LoadingWrapper>
  );
}

ApiKeys.propTypes = {
  keys: shape({
    active: bool,
    value: string
  }),
  loading: bool,
  toggleKey: func
};

export default ApiKeys;
