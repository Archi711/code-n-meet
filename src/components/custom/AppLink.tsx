import { Link as BrowserLink, LinkProps as BrowserLinkProps } from 'react-router-dom'
import { Link, LinkProps } from '@chakra-ui/react'

type AppLinkProps = React.PropsWithChildren<{

}> & LinkProps & BrowserLinkProps
export default function AppLink(props: AppLinkProps) {

  return <Link {...props} as={BrowserLink} to={props.to}>{props.children}</Link>
}
