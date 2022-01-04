import { ReactComponent as Facebook } from '../../assets/cfacebook.svg';
import { ReactComponent as Twitter } from '../../assets/ctwitter.svg';
import { ReactComponent as Telegram } from '../../assets/ctelegram.svg';
import { Wrapper } from './styles';

export default function Share() {
  const shareMSG = 'Claim $SEL tokens airdrop via airdropv2.selendra.org. follow us on Twitter twitter.com/selendrachain and Telegram t.me/selendrachain. %23Selendra %23Blockchain %23SmartContract %23OpenSource';
  
  const onTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=https%3A%2F%2Fairdropv2.selendra.org%2F&text=${shareMSG}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  }
  const onFacebook = () => {
    window.open(`http://www.facebook.com/sharer.php?u=http%3A%2F%2Fairdropv2.selendra.org&quote=${shareMSG}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
  }
  const onTelegram = () => {
    window.open('https://t.me/selendrachain', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  }

  return (
    <Wrapper>
      <p>Share the airdrop with your friends and family</p>
      <Twitter style={{cursor: 'pointer'}} onClick={onTwitter} />
      <Facebook style={{cursor: 'pointer', margin: '0 10px'}} onClick={onFacebook} />
      <Telegram style={{cursor: 'pointer'}} onClick={onTelegram} />
    </Wrapper>
  )
}