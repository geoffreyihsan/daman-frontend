import className from 'classnames/bind';
import styles from './ContentWrapperPage.module.scss';

let cx = className.bind(styles);

export default function ContentWrapperPage({ content, children, className }) {
  return (
    <article className={cx(['component', className])}>
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  );
}
