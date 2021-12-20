import {
  Link as BrowserLink,
  LinkProps as BrowserLinkProps,
} from 'react-router-dom'
import { Link, LinkProps } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

type AppLinkProps = PropsWithChildren<{}> & LinkProps & BrowserLinkProps
export default function AppLink(props: AppLinkProps) {
  return (
    <Link {...props} as={BrowserLink} to={props.to}>
      {props.children}
    </Link>
  )
}
