import * as React from 'react';
import classNames from 'classnames';


type PagePadderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Super basic component that just provides common padding to page components.
 * Keeping this a separate component enables customizing padding behavior on
 * different pages-- e.g., the "Home" page has images that are not indented
 */
const PagePadder: React.FC<PagePadderProps> = ({ className, ...rest }) => {
  const classes = classNames('page-padder', className);
  return <div className={classes} {...rest} />;
};

export default PagePadder;
