export const connectWallet = async () => {
   if (window.ethereum) {
      try {
         const addressArray = await window.ethereum.request({
            method: 'eth_requestAccounts',
         })
         const obj = {
            status: '👆🏽 Write a message in the text-field above.',
            address: addressArray[0],
         }
         return obj
      } catch (err) {
         //@ts-ignore
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
