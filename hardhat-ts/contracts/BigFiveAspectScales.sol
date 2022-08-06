// SPDX-License-Identifier: MIT
// Scales from: International Personality Item Pool: A Scientific Collaboratory for the Development of Advanced Measures of Personality Traits and Other Individual Differences (http://ipip.ori.org/). Internet Web Site.
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract BigFiveAspectsScales is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint numItems = 5;
    enum Scale { extraversion, conscientiousness, agreeableness, emotionalStability, intellect }

    struct Output {
        mapping(uint => uint) counts;
        mapping(uint => uint) scores;
        // 0 - extraversion;
        // 1 - conscientiousness;
        // 2 - agreeableness;
        // 3 - emotionalStability;
        // 4 - intellect;
    }

    mapping(uint => uint) counts;
    mapping(uint => uint) scores;

    struct Question {
        string question;
        bool positive;
        Scale scale;
    }

    Question[] questions;
    mapping(uint256 => Output) outputs;

    constructor() ERC721("Big Five Aspects Scales", "BFAS") {
        questions.push(Question("Am a very private person.", false, Scale.extraversion));
        questions.push(Question("Am always prepared.", true, Scale.conscientiousness));
        questions.push(Question("Am easily disturbed.", false, Scale.emotionalStability));
        questions.push(Question("Am exacting in my work.", true, Scale.conscientiousness));
        questions.push(Question("Am full of ideas.", true, Scale.intellect));
        questions.push(Question("Am good at many things.", true, Scale.intellect));
        questions.push(Question("Am hard to get to know.", false, Scale.agreeableness));
        questions.push(Question("Am indifferent to the feelings of others.", false, Scale.agreeableness));
        questions.push(Question("Am interested in people.", true, Scale.agreeableness));
        questions.push(Question("Am not really interested in others.", false, Scale.agreeableness));
        questions.push(Question("Am on good terms with nearly everyone.", true, Scale.agreeableness));
        questions.push(Question("Am quiet around strangers.", false, Scale.extraversion));
        questions.push(Question("Am the life of the party.", true, Scale.extraversion));
        questions.push(Question("Bottle up my feelings.", false, Scale.extraversion));
        questions.push(Question("Catch on to things quickly.", true, Scale.intellect));
        questions.push(Question("Change my mood a lot.", false, Scale.emotionalStability));
        questions.push(Question("Continue until everything is perfect.", true, Scale.conscientiousness));
        questions.push(Question("Do not have a good imagination.", false, Scale.intellect));
        questions.push(Question("Don't like to draw attention to myself.", false, Scale.extraversion));
        questions.push(Question("Don't mind being the center of attention.", true, Scale.extraversion));
        questions.push(Question("Feel at ease with people.", true, Scale.extraversion));
        questions.push(Question("Feel comfortable around people.", true, Scale.extraversion));
        questions.push(Question("Feel little concern for others.", false, Scale.agreeableness));
        questions.push(Question("Feel threatened easily.", false, Scale.emotionalStability));
        questions.push(Question("Find it difficult to get down to work.", false, Scale.conscientiousness));
        questions.push(Question("Follow a schedule.", true, Scale.conscientiousness));
        questions.push(Question("Get angry easily.", false, Scale.emotionalStability));
        questions.push(Question("Get caught up in my problems.", false, Scale.emotionalStability));
        questions.push(Question("Get chores done right away.", true, Scale.conscientiousness));
        questions.push(Question("Get irritated easily.", false, Scale.emotionalStability));
        questions.push(Question("Get overwhelmed by emotions.", false, Scale.emotionalStability));
        questions.push(Question("Get upset easily.", false, Scale.emotionalStability));
        questions.push(Question("Grumble about things.", false, Scale.emotionalStability));
        questions.push(Question("Have a good word for everyone.", true, Scale.agreeableness));
        questions.push(Question("Have a vivid imagination.", true, Scale.intellect));
        questions.push(Question("Have difficulty imagining things.", false, Scale.intellect));
        questions.push(Question("Have little to say.", false, Scale.extraversion));
        questions.push(Question("Inquire about others' well-being.", true, Scale.agreeableness));
        questions.push(Question("Know how to captivate people.", true, Scale.extraversion));
        questions.push(Question("Know how to comfort others.", true, Scale.agreeableness));
        questions.push(Question("Leave a mess in my room.", false, Scale.conscientiousness));
        questions.push(Question("Leave my belongings around.", false, Scale.conscientiousness));
        questions.push(Question("Like to tidy up.", true, Scale.conscientiousness));
        questions.push(Question("Love children.", true, Scale.agreeableness));
        questions.push(Question("Love order and regularity.", true, Scale.conscientiousness));
        questions.push(Question("Love to help others.", true, Scale.agreeableness));
        questions.push(Question("Love to read challenging material.", true, Scale.intellect));
        questions.push(Question("Love to think up new ways of doing things.", true, Scale.intellect));
        questions.push(Question("Make a mess of things.", false, Scale.conscientiousness));
        questions.push(Question("Make plans and stick to them.", true, Scale.conscientiousness));
        questions.push(Question("Often feel uncomfortable around others.", false, Scale.extraversion));
        questions.push(Question("Panic easily.", false, Scale.emotionalStability));
        questions.push(Question("Rarely get irritated.", true, Scale.emotionalStability));
        questions.push(Question("Seldom get mad.", true, Scale.emotionalStability));
        questions.push(Question("Shirk my duties.", false, Scale.conscientiousness));
        questions.push(Question("Show my gratitude.", true, Scale.agreeableness));
        questions.push(Question("Spend time reflecting on things.", true, Scale.intellect));
        questions.push(Question("Start conversations.", true, Scale.extraversion));
        questions.push(Question("Take offense easily.", false, Scale.emotionalStability));
        questions.push(Question("Take time out for others.", true, Scale.agreeableness));
        questions.push(Question("Think of others first.", true, Scale.agreeableness));
        questions.push(Question("Wait for others to lead the way.", false, Scale.extraversion));
        questions.push(Question("Waste my time.", false, Scale.conscientiousness));
        questions.push(Question("Worry about things.", false, Scale.emotionalStability));
    }

    function mintResultNFT(uint[] memory _inputs) public {

        for(uint i=0; i<_inputs.length; i++) {
            if (questions[i].positive == true){
                scores[uint(questions[i].scale)] += _inputs[i];
            } else if (questions[i].positive == false) {
                scores[uint(questions[i].scale)] += 6 - _inputs[i];
            }
            counts[uint(questions[i].scale)] += 1;
        }

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        for (uint j=0; j<numItems; j++) {
            outputs[tokenId].counts[j] = counts[j];
            outputs[tokenId].scores[j] = scores[j];
            counts[j] = 0;
            scores[j] = 0;
        }

        // string memory uri = generateTokenURI(tokenId);
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, generateTokenURI(tokenId));
    }

    function getResult(uint _tokenId) public view returns (uint[] memory, uint[] memory) {
        uint[] memory _counts = new uint[](numItems);
        uint[] memory _scores = new uint[](numItems);
        for (uint j=0; j<numItems; j++) {
            _counts[j] = outputs[_tokenId].counts[j];
            _scores[j] = outputs[_tokenId].scores[j];
        }
        return (_counts, _scores);
    }

    function generateTokenURI(uint256 tokenId) public view returns (string memory) {
        bytes memory svgData = abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="#c4933b" />',
                        '<text x="10" y="20" class="base">',
                        "Extraversion: ",
                        Strings.toString(outputs[tokenId].scores[0]/outputs[tokenId].counts[0]),
                        '</text><text x="10" y="40" class="base">',
                        "Conscientiousness: ",
                        Strings.toString(outputs[tokenId].scores[1]/outputs[tokenId].scores[1]),
                        '</text><text x="10" y="60" class="base">',
                        "Agreeableness: ",
                        Strings.toString(outputs[tokenId].scores[2]/outputs[tokenId].scores[2]),
                        '</text><text x="10" y="80" class="base">',
                        "Emotional Stability: ",
                        Strings.toString(outputs[tokenId].scores[3]/outputs[tokenId].scores[3]),
                        '</text><text x="10" y="100" class="base">',
                        "Intellect: ",
                        Strings.toString(outputs[tokenId].scores[4]/outputs[tokenId].scores[4]),
                        '</text></svg>'
                    )
                )
            )
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,", 
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{',
                                '"name": ', '"', name(), ' #', Strings.toString(tokenId), '",'
                                '"description": "",'
                                '"image": "',
                                svgData,
                                '"',
                            '}'
                        )
                    )
                )
            )
        );
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}