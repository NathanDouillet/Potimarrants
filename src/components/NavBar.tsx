import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import LinkOrder from './ModalOrder/LinkOrder';

type NavBarCssProperties = {
  navbar: CSSProperties;
  divider: CSSProperties;
  verticalDivider: CSSProperties;
  items: CSSProperties;
  link: CSSProperties;
};
const styles: NavBarCssProperties = {
  navbar: {
    height: 77,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: "'Source Sans Pro', sans-serif",
    fontWeight: 300,
    color: 'white',
    position: 'absolute',
    top: 0,
    userSelect: 'none'
  },
  divider: {
    flexGrow: 1,
    height: 3,
    borderTop: 'solid 1px rgba(192, 192, 192, 0.35)',
    borderBottom: 'solid 1px rgba(192, 192, 192, 0.35)'
  },
  verticalDivider: {
    height: '20%',
    borderRight: 'solid 1px rgba(192, 192, 192, 0.35)'
  },
  items: {
    width: 1000,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer'
  }
};

const query = graphql`
  {
    file(name: { eq: "white-logo" }) {
      childImageSharp {
        fixed(height: 66) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

const NavBar = () => {
  const data = useStaticQuery(query);

  return (
    <div style={styles.navbar}>
      <div style={styles.divider} />
      <div style={styles.verticalDivider} />
      <div style={styles.items}>
        <Link to='/#' style={styles.link}>
          A propos
        </Link>
        <Link to='/#' style={styles.link}>
          Blog
        </Link>
        <Img
          fixed={data.file.childImageSharp.fixed}
          fadeIn={false}
          draggable={false}
        />
        <Link to='/#' style={styles.link}>
          Contact
        </Link>
        <LinkOrder style={styles.link} />
      </div>
      <div style={styles.verticalDivider} />
      <div style={styles.divider} />
    </div>
  );
};

export default NavBar;
