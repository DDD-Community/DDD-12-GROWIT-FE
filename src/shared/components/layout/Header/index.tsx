import { HeaderDesktop, HeaderMode } from './Header.Desktop';
import { HeaderMobile } from './Header.Mobile';
import { HeaderBackButton } from './Header.Mobile';

interface HeaderProps {
  mode?: HeaderMode;
  title?: string;
  rightSection?: React.ReactNode;
}

const Header = ({ mode = 'page', title, rightSection }: HeaderProps) => {
  return (
    <>
      <HeaderDesktop mode={mode} title={title} rightSection={rightSection} />
      <HeaderMobile mode={mode} title={title} rightSection={rightSection} />
    </>
  );
};

export { HeaderBackButton };

export default Header;
