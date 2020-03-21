import * as React from 'react';
import { PagePadder } from '../shared';
import FirstFloor from './FirstFloor';
import './Interior.less';


/** ======================== Components ==================================== */
const Exterior: React.FC = () =>
  <PagePadder className="interior-page">
    <FirstFloor />
  </PagePadder>;

/** ======================== Exports ======================================= */
export default Exterior;
