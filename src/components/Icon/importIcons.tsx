const importAll = (requireContext:any) => requireContext.keys().map(requireContext) 
try {
  const req = require.context('../../assets/svgs/', true, /\.svg$/)
  importAll(req)
} catch (e) {

}