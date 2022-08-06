import { ethers } from 'hardhat'
import '@nomiclabs/hardhat-ethers'
import "@nomicfoundation/hardhat-toolbox";

async function main() {
   const BigFiveContractFactory = await ethers.getContractFactory(
      'BigFiveAspectsScales'
   )
   const BigFiveContract = await BigFiveContractFactory.deploy()

   await BigFiveContract.deployed()

   console.log('Deployed to:', BigFiveContract.address)
   process.exit(0)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
   console.error(error)
   process.exit(1)
})
