import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://jqkikoujohoknfxptfuj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impxa2lrb3Vqb2hva25meHB0ZnVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzE3MjAsImV4cCI6MjA4MTc0NzcyMH0.anrRmww-lfqt6rjVs7d7XTyYfWnpifaESANhEhlEpXA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database tables structure:
/*
Users table:
- id (uuid, primary key)
- email (text, unique)
- first_name (text)
- last_name (text)
- university (text)
- avatar_url (text)
- campus_points (integer, default 0)
- total_swaps (integer, default 0)
- created_at (timestamp)

Items table:
- id (uuid, primary key)
- title (text)
- description (text)
- category (text)
- condition (text)
- exchange_type (text)
- price (numeric)
- images (text[])
- owner_id (uuid, foreign key to users)
- status (text, default 'available')
- views (integer, default 0)
- likes (uuid[], array of user ids)
- created_at (timestamp)

Swaps table:
- id (uuid, primary key)
- requester_id (uuid, foreign key to users)
- owner_id (uuid, foreign key to users)
- item_id (uuid, foreign key to items)
- status (text, default 'pending')
- message (text)
- created_at (timestamp)
*/

class SupabaseService {
  // Auth methods
  async signUp(email, password, userData) {
    // First sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          university: userData.university
        }
      }
    })
    
    if (authError) throw authError
    
    // Create user profile in public.users table immediately
    if (authData.user) {
      try {
        const { error: profileError } = await supabase
          .from('users')
          .upsert([{
            id: authData.user.id,
            first_name: userData.firstName,
            last_name: userData.lastName,
            university: userData.university,
            campus_points: 0,
            total_swaps: 0
          }], { onConflict: 'id' })
        
        if (profileError) {
          console.error('Profile creation error:', profileError)
        }
      } catch (error) {
        console.error('Failed to create profile:', error)
      }
    }
    
    return authData
  }

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    
    // Ensure user profile exists
    if (data.user) {
      try {
        const { data: existingProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()
        
        if (!existingProfile) {
          // Create profile if it doesn't exist
          await supabase
            .from('users')
            .insert([{
              id: data.user.id,
              first_name: data.user.user_metadata?.first_name || 'User',
              last_name: data.user.user_metadata?.last_name || '',
              university: data.user.user_metadata?.university || 'University',
              campus_points: 0,
              total_swaps: 0
            }])
        }
      } catch (error) {
        console.error('Profile check/creation error:', error)
      }
    }
    
    return data
  }

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }

  // User profile methods
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  }

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Items methods
  async getItems(filters = {}) {
    let query = supabase
      .from('items')
      .select(`
        *,
        owner:users(id, first_name, last_name)
      `)
      .eq('status', 'available')
      .order('created_at', { ascending: false })

    if (filters.category) {
      query = query.eq('category', filters.category)
    }
    if (filters.exchangeType) {
      query = query.eq('exchange_type', filters.exchangeType)
    }
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  }

  async getMyItems(userId) {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('owner_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  async createItem(itemData) {
    const { data, error } = await supabase
      .from('items')
      .insert([itemData])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async updateItem(itemId, updates) {
    const { data, error } = await supabase
      .from('items')
      .update(updates)
      .eq('id', itemId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async deleteItem(itemId) {
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', itemId)
    
    if (error) throw error
  }

  async likeItem(itemId, userId) {
    // First get current likes
    const { data: item } = await supabase
      .from('items')
      .select('likes')
      .eq('id', itemId)
      .single()

    const currentLikes = item?.likes || []
    const isLiked = currentLikes.includes(userId)
    
    let newLikes
    if (isLiked) {
      newLikes = currentLikes.filter(id => id !== userId)
    } else {
      newLikes = [...currentLikes, userId]
    }

    const { data, error } = await supabase
      .from('items')
      .update({ likes: newLikes })
      .eq('id', itemId)
      .select()
      .single()

    if (error) throw error
    return { liked: !isLiked, likes: newLikes.length }
  }

  // Dashboard stats
  async getDashboardStats(userId) {
    const { data: items } = await supabase
      .from('items')
      .select('*')
      .eq('owner_id', userId)

    const { data: user } = await supabase
      .from('users')
      .select('campus_points, total_swaps')
      .eq('id', userId)
      .single()

    const totalItems = items?.length || 0
    const activeItems = items?.filter(item => item.status === 'available').length || 0
    const recentItems = items?.slice(-5).reverse() || []

    return {
      totalItems,
      activeItems,
      completedSwaps: user?.total_swaps || 0,
      campusPoints: user?.campus_points || 0,
      recentItems
    }
  }

  // File upload
  async uploadImage(file, bucket = 'item-images') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return publicUrl
  }

  // Real-time subscriptions
  subscribeToItems(callback) {
    return supabase
      .channel('items')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'items' }, 
        callback
      )
      .subscribe()
  }

  subscribeToUserItems(userId, callback) {
    return supabase
      .channel(`user-items-${userId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'items',
          filter: `owner_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe()
  }

  // Chat methods
  async getConversations(userId) {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        user1:users!conversations_user1_id_fkey(id, first_name, last_name),
        user2:users!conversations_user2_id_fkey(id, first_name, last_name)
      `)
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order('last_message_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  async getMessages(conversationId) {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:users!messages_sender_id_fkey(id, first_name, last_name)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  }

  async sendMessage(senderId, receiverId, content) {
    // First, find or create conversation
    let { data: conversation } = await supabase
      .from('conversations')
      .select('id')
      .or(`and(user1_id.eq.${senderId},user2_id.eq.${receiverId}),and(user1_id.eq.${receiverId},user2_id.eq.${senderId})`)
      .single()
    
    if (!conversation) {
      const { data: newConv, error: convError } = await supabase
        .from('conversations')
        .insert([{
          user1_id: senderId,
          user2_id: receiverId
        }])
        .select()
        .single()
      
      if (convError) throw convError
      conversation = newConv
    }
    
    // Send message
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        sender_id: senderId,
        receiver_id: receiverId,
        content,
        conversation_id: conversation.id
      }])
      .select()
      .single()
    
    if (error) throw error
    
    // Update conversation last_message_at
    await supabase
      .from('conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', conversation.id)
    
    return data
  }

  async markMessageAsRead(messageId) {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', messageId)
    
    if (error) throw error
  }

  // Swaps methods
  async createSwap(swapData) {
    const { data, error } = await supabase
      .from('swaps')
      .insert([{
        requester_id: swapData.requesterId,
        owner_id: swapData.ownerId,
        item_id: swapData.itemId,
        message: swapData.message,
        status: 'pending'
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async getMySwaps(userId) {
    const { data, error } = await supabase
      .from('swaps')
      .select(`
        *,
        item:items(*),
        requester:users!swaps_requester_id_fkey(*),
        owner:users!swaps_owner_id_fkey(*)
      `)
      .or(`requester_id.eq.${userId},owner_id.eq.${userId}`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    
    if (error) throw error
    return { message: 'Password reset email sent' }
  }
}

export default new SupabaseService()