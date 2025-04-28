import {spec, converter} from 'modules/rumbleBidAdapter.js';
import {BANNER} from "../../../src/mediaTypes";
import {getUniqueIdentifierStr} from "../../../src/utils";
import {expect} from "chai";

const bidder = 'rumble';


describe('RumbleBidAdapter', function() {
  describe('isBidRequestValid', function() {
    const bidId = getUniqueIdentifierStr();
    const bidderRequestId = getUniqueIdentifierStr();

    function newBid() {
      return {
        bidder,
        bidId,
        bidderRequestId,
        params: {
          publisherId: '123',
          siteId: '321',
        },
        mediaTypes: {
          [BANNER]: {
            sizes: [[300, 250]]
          }
        },
      }
    }

    it('should return true when all required parameters exist', function() {
      expect(spec.isBidRequestValid(newBid())).to.equal(true);
    });

    it('should return false when publisherId is not present', function() {
      let bid = newBid();
      delete bid.params.publisherId;
      expect(spec.isBidRequestValid(bid)).to.equal(false);
    });

    it('should return false when siteId is not present', function() {
      let bid = newBid();
      delete bid.params.siteId;
      expect(spec.isBidRequestValid(bid)).to.equal(false);
    });

    it('should return false if mediaTypes.banner or video is not present', function () {
      let bid = newBid();
      delete bid.mediaTypes
      expect(spec.isBidRequestValid(bid)).to.equal(false);
    });
  });
});
