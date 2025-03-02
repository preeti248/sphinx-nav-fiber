import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex } from '~/components/common/Flex'
import { Text } from '~/components/common/Text'
import { Stats } from '~/components/Stats'
import { getAboutData, TAboutParams } from '~/network/fetchSourcesData'
import { colors } from '~/utils/colors'
import { media } from '~/utils/media'

const defaultData = {
  description: '',
  mission_statement: '',
  search_term: '',
  title: '',
}

export const AppBar = () => {
  const [initialValues, setInitialValues] = useState<TAboutParams>(defaultData)

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getAboutData()

        setInitialValues(response)
      } catch (error) {
        console.warn(error)
      }
    }

    init()
  }, [])

  return (
    <Header>
      <TitleWrapper>
        <>
          {initialValues.title && (
            <Text className="title" color="white">
              {initialValues.title}
            </Text>
          )}
        </>
        <Text className="subtitle"> Second Brain</Text>
      </TitleWrapper>
      <Stats />
    </Header>
  )
}

const Header = styled(Flex).attrs({
  align: 'center',
  direction: 'row',
  grow: 1,
  justify: 'flex-start',
})`
  height: 64px;
  position: absolute;
  top: 0px;
  left: 64px;
  right: 32px;
  transition: opacity 1s;
  z-index: 99;
  padding: 20px 23px;
`

const TitleWrapper = styled.div`
  ${media.smallOnly`
    display: none;
  `}

  width: 367px;

  .title {
    color: var(--Primary-Text, #fff);
    font-family: Barlow;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 72.727% */
    letter-spacing: 0.22px;
  }

  .subtitle {
    color: ${colors.GRAY6};
    font-family: Barlow;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.22px;
  }
`
