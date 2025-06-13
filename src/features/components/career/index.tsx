import { CurrentOpening } from './currentOpening'
import { CareerHero } from './hero'
import { CareerStyled } from './styles.component'

export const Career = () => {
  return (
    <div style={{ gap: '100px', display: 'flex', flexDirection: 'column' }}>
      <CareerHero />
      <CareerStyled>
        <CurrentOpening />
      </CareerStyled>
    </div>
  )
}
