# DogGo's: Tableland-Powered Adoptable Dog NFT Marketplace

Welcome to DogGo's, the Adoptable Dog NFT Marketplace that leverages the power of Tableland to support shelter dogs and raise awareness. This project was created for the Open Data Hackathon.

demo: https://youtu.be/sM6je54anVU


https://adopt-doggos.netlify.app/

## Project Overview

Every year, millions of dogs find themselves in shelters, and our mission is to make a difference. DogGo's is an innovative NFT marketplace that connects dog lovers with adoptable dogs while simultaneously raising funds for shelters and rescue organizations.

## Key Features

- **Adoption NFTs:** Users can adopt (mint) NFTs representing real shelter dogs.
- **Real-Time Data:** Tableland is used to dynamically update data, such as adoption status and dog information.
- **Funding Shelters:** A portion of each NFT purchase goes directly to the shelter's crypto wallet.
- **Future Gamification:** In future phases, we plan to gamify adoptions based on how long a dog has been in a shelter.

## How It Works

DogGo's consists of three main components:

1. **Backend Serverless Functions:** These functions interact with the Petfinder.com API to retrieve data on shelter dogs.
2. **DogGos UI:** Our user-friendly React application lets users mint NFTs and learn about adoptable dogs.
3. **Smart Contract:** Powered by Solidity, our smart contract enables NFT purchase, minting, transfer, and fund distribution.

## Tableland Integration

Tableland is a crucial part of DogGo's:

- **Dynamic Data:** We use Tableland tables to store real-time data on adoptable dogs, including adoption status and other metadata.
- **Token Metadata:** Tableland helps us generate dynamic token metadata, ensuring accurate and up-to-date information for each NFT.

## Technology Stack

- **Backend**: Serverless Functions
- **Frontend**: React, RainbowKit, wagmi
- **Smart Contract**: Solidity (ERC721)
- **Data Access**: Tableland Javascript SDK
- **UI Design**: Chakra UI

## Getting Started

Follow these steps to get DogGo's up and running:

1. Clone this repository.
2. Install the necessary dependencies.
3. Set up your development environment.
4. Run the application locally or deploy it.

Detailed instructions can be found in our [Development Guide](docs/development-guide.md).

---
