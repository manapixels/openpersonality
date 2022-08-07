export const getCurrentWalletConnected = async () => {
   if (window.ethereum) {
      try {
         const addressArray = await window.ethereum.request({
            method: 'eth_accounts',
         })
         if (addressArray.length > 0) {
            return {
               address: addressArray[0],
               status: '👆🏽 Write a message in the text-field above.',
            }
         } else {
            return {
               address: '',
               status: '🦊 Connect to Metamask using the top right button.',
            }
         }
      } catch (err) {
         return {
            address: '',
            //@ts-ignore
            status: '😥 ' + err.message,
         }
      }
   } else {
      return {
         address: '',
         status: (
            <span>
               <p>
                  {' '}
                  🦊{' '}
                  <a
                     target="_blank"
                     href={`https://metamask.io/download.html`}
                     rel="noreferrer"
                  >
                     You must install Metamask, a virtual Ethereum wallet, in
                     your browser.
                  </a>
               </p>
            </span>
         ),
      }
   }
}
