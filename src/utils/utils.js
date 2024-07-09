const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const getHHmmss = (ms) => {
  if (ms < 0) {
    return "";
  }
  let s = Math.floor(ms / 1000);
  let h = Math.floor(s / 3600);
  let m = Math.floor((s % 3600) / 60);
  let _s = s % 60;
  if (isNaN(_s)) {
    return "";
  }
  let hh = h >= 10 ? h : `0${h}`;
  let mm = m >= 10 ? m : `0${m}`;
  let ss = _s >= 10 ? _s : `0${_s}`;
  if (_s <= 0) return "";
  let res = `${ss} seconds`;
  if (m > 0) {
    res = `${mm} mins ${res}`;
  }
  if (h > 0) {
    res = `${hh} hours ${res}`;
  }
  return res;
}

const formatWallet = (walletAddress) => {
  if (!walletAddress) return "";
  return walletAddress.slice(0, 4) + "..." + walletAddress.slice(walletAddress.length - 4);
}

const tonScanUrl = (wallet) => {
  return 'https://tonscan.org/address/' + wallet;
}

export { formatWallet, sleep, getHHmmss, tonScanUrl };