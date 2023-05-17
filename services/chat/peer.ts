class PeerService {
  peer: RTCPeerConnection;
  constructor() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
  }

  async getAnswer (offer : RTCSessionDescription){
    await this.peer.setLocalDescription(offer)
    const answer = await this.peer.createAnswer()
    await this.peer.setLocalDescription(new RTCSessionDescription(answer));
    return answer;
  }

  async getOffer() {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(new RTCSessionDescription(offer));
    return offer;
  }
}

export default PeerService;
