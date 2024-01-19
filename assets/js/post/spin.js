const rad = Math.PI / 180

let alpha = 0
let beta = 0
let gamma = 0

let q = new Quaternion()
let spin = 0

function onOrientationChange (ev) {
  alpha = ev.alpha
  beta = ev.beta
  gamma = ev.gamma

  let nq = Quaternion.fromEuler(alpha * rad, beta * rad, gamma * rad, 'ZXY')

  let d1 = q.sub(nq).norm()
  let d2 = q.add(nq).norm()

  q = d1 < d2 ? nq : nq.neg()

  spin = q.real()>0 ? 0 : 1

  document.querySelector('#angles').textContent = "α=" + alpha.toFixed(1) + ", β=" + beta.toFixed(1) + ", γ=" + gamma.toFixed(1)
  document.querySelector('#quaternion').textContent = str(q)
  document.querySelector('#spin').textContent = spin
}

function str(q){
  let v = q.toVector().map(x => x.toFixed(3))
  return v[0] + ", " + v[1] + "i, " + v[2] + "j, " + v[3] + "k"
}

if ('ondeviceorientationabsolute' in window) {
  window.addEventListener("deviceorientationabsolute", onOrientationChange, true)
} else if ('ondeviceorientation' in window) {
  window.addEventListener("deviceorientation", onOrientationChange, true)
}
