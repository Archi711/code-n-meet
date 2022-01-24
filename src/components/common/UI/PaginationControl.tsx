import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { IconButton, Input, VStack } from '@chakra-ui/react';

type PaginationControlProps = {
  value: number
  valueSetter: (pageNumber: number) => any
}
export default function PaginationControl(props: PaginationControlProps) {

  return <VStack>
    <IconButton onClick={() => props.valueSetter(props.value - 1)} aria-label='Go to previous page' icon={<ArrowBackIcon />} />
    <Input value={props.value} readOnly />
    <IconButton onClick={() => props.valueSetter(props.value + 1)} aria-label='Go to next page' icon={<ArrowForwardIcon />} />
  </VStack>
}
