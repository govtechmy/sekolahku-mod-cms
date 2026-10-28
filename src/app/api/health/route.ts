/**
 * Liveness probe for the ALB target group and the ECS container health check.
 *
 * Deliberately shallow: it must answer 200 as soon as the HTTP server is up,
 * without touching MongoDB, Secrets Manager or the auth layer. A deep check
 * here would fail while those dependencies warm up and ECS would kill the
 * task before it ever became ready.
 */
export const dynamic = 'force-dynamic'

export const GET = async () => Response.json({ status: 'ok' })
