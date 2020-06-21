import styled from 'rn-css'

const ColorCircle = styled.TouchableOpacity<{color: string; size?: number}>`
  backgroundColor: ${props => props.color};
  width: ${props => props.size || 2}em;
  height: ${props => props.size || 2}em;
  border-radius: 50%;
`

export default ColorCircle
