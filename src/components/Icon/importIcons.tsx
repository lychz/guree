const importAll = (requireContext:any) => requireContext.keys().map(requireContext) 
const req = require.context('../../assets/svgs/', true, /\.svg$/)
importAll(req) 