import { Stack } from '@chakra-ui/react'
import { GroupResponse } from '../../../types'

type GroupShortProps = {
  group: GroupResponse
}

export default function GroupShort({ group }: GroupShortProps) {
  return <Stack>{group.name}</Stack>
}
