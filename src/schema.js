import { gql } from 'apollo-server-cloudflare';

export const typeDefs = gql`
input Filters {
    start: String!
    end: String!
    fields: [Fields!]
    count: Int = 10
    sample: Float
    timestamps: TimeStampType = unixnano
}

enum TimeStampType {
    unixnano
    unix
    rfc3339
}

enum Fields {
    CacheCacheStatus
    CacheResponseBytes
    CacheResponseStatus
    CacheTieredFill
    ClientASN
    ClientCountry
    ClientDeviceType
    ClientIP
    ClientIPClass
    ClientRequestBytes
    ClientRequestHost
    ClientRequestMethod
    ClientRequestPath
    ClientRequestProtocol
    ClientRequestReferer
    ClientRequestURI
    ClientRequestUserAgent
    ClientSSLCipher
    ClientSSLProtocol
    ClientSrcPort
    EdgeColoCode
    EdgeColoID
    EdgeEndTimestamp
    EdgePathingOp
    EdgePathingSrc
    EdgePathingStatus
    EdgeRateLimitAction
    EdgeRateLimitID
    EdgeRequestHost
    EdgeResponseBytes
    EdgeResponseCompressionRatio
    EdgeResponseContentType
    EdgeResponseStatus
    EdgeServerIP
    EdgeStartTimestamp
    FirewallMatchesActions
    FirewallMatchesRuleIDs
    FirewallMatchesSources
    OriginIP
    OriginResponseBytes
    OriginResponseHTTPExpires
    OriginResponseHTTPLastModified
    OriginResponseStatus
    OriginResponseTime
    OriginSSLProtocol
    ParentRayID
    RayID
    #TODO: RequestHeaders
    #TODO: ResponseHeaders
    SecurityLevel
    WAFAction
    WAFFlags
    WAFMatchedVar
    WAFProfile
    WAFRuleID
    WAFRuleMessage
    WorkerCPUTime
    WorkerStatus
    WorkerSubrequest
    WorkerSubrequestCount
    ZoneID
}

type Response {
    CacheCacheStatus: String
    CacheResponseBytes: Int
    CacheResponseStatus: Int
    CacheTieredFill: Boolean
    ClientASN: Int
    ClientCountry: String
    ClientDeviceType: String
    ClientIP: String
    ClientIPClass: String
    ClientRequestBytes: Int
    ClientRequestHost: String
    ClientRequestMethod: String
    ClientRequestPath: String
    ClientRequestProtocol: String
    ClientRequestReferer: String
    ClientRequestURI: String
    ClientRequestUserAgent: String
    ClientSSLCipher: String
    ClientSSLProtocol: String
    ClientSrcPort: Int
    EdgeColoCode: String
    EdgeColoID: Int
    EdgeEndTimestamp: String
    EdgePathingOp: String
    EdgePathingSrc: String
    EdgePathingStatus: String
    EdgeRateLimitAction: String
    EdgeRateLimitID: Int
    EdgeRequestHost: String
    EdgeResponseBytes: Int
    EdgeResponseCompressionRatio: Float
    EdgeResponseContentType: String
    EdgeResponseStatus: Int
    EdgeServerIP: String
    EdgeStartTimestamp: String
    FirewallMatchesActions: [String]
    FirewallMatchesRuleIDs: [String]
    FirewallMatchesSources: [String]
    OriginIP: String
    OriginResponseBytes: Int
    OriginResponseHTTPExpires: String
    OriginResponseHTTPLastModified: String
    OriginResponseStatus: Int
    OriginResponseTime: Int
    OriginSSLProtocol: String
    ParentRayID: String
    RayID: String
    #TODO: RequestHeaders: String
    #TODO: ResponseHeaders: String
    SecurityLevel: String
    WAFAction: String
    WAFFlags: String
    WAFMatchedVar: String
    WAFProfile: String
    WAFRuleID: String
    WAFRuleMessage: String
    WorkerCPUTime: Int
    WorkerStatus: String
    WorkerSubrequest: Boolean
    WorkerSubrequestCount: Int
    ZoneID: Int
}

type UserData {
    organizations: [OrganizationData]
    betas: [String]
    telephone: String
    zipcode: String
    last_name: String
    modified_on: String
    username: String
    created_on: String
    country: String
    two_factor_authentication_enabled: Boolean
    first_name: String
    id: String
    suspended: String
    email: String
}

type OrganizationData {
    id: String
    name: String
    status: String
    permissions: [String]
    roles: [String]    
}

type Query {
    logpull(zone: String!, filters: Filters!): [Response],
    userinfo: UserData 
}
`