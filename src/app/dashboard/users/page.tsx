'use client';

import { useState, useEffect } from "react";
import { 
  Search, 
  UserPlus, 
  Shield, 
  Trash2,
  Edit2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

/**
 * TEAM MANAGEMENT MODULE
 * Content renders within the persistent Dashboard Layout shell.
 */
export default function UsersManagementPage() {
  const supabase = createClient();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        setUsers(data);
      } else {
        // Fallback for demonstration / empty database
        setUsers([
          { id: '1', name: 'Super Admin', email: 'admin@steakwest.com', role: 'admin', status: 'active', created_at: new Date().toISOString() },
          { id: '2', name: 'John Cashier', email: 'john@steakwest.com', role: 'cashier', status: 'active', created_at: new Date().toISOString() },
          { id: '3', name: 'Sara Manager', email: 'sara@steakwest.com', role: 'manager', status: 'active', created_at: new Date().toISOString() },
        ]);
      }
      setLoading(false);
    }
    fetchUsers();
  }, [supabase]);

  const filteredUsers = users.filter(u => 
    (u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
     u.email?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Team Management</h1>
          <p className="text-[13px] font-bold text-slate-400">Manage node permissions and staff access</p>
        </div>
        <Button className="bg-[#3b82f6] hover:bg-[#2563eb] h-11 px-6 rounded-md gap-2 font-bold text-[13px]">
          <UserPlus className="w-4 h-4 stroke-[3px]" /> Add Team Member
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#e2e8f0]/30 p-4 rounded-lg flex flex-wrap items-center gap-4 border border-slate-200">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-9 h-10 bg-white border-slate-200 text-[13px] rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="w-48 h-10 bg-white border-slate-200 text-[13px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="cashier">Cashier</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="bg-[#64748b] hover:bg-[#475569] text-white border-none h-10 px-6 font-bold text-[13px] ml-auto">Reset Filters</Button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-transparent border-b border-slate-200">
              <TableHead className="text-[12px] font-black uppercase text-slate-500 tracking-wider">Member</TableHead>
              <TableHead className="text-[12px] font-black uppercase text-slate-500 tracking-wider">Role</TableHead>
              <TableHead className="text-[12px] font-black uppercase text-slate-500 tracking-wider">Status</TableHead>
              <TableHead className="text-[12px] font-black uppercase text-slate-500 tracking-wider">Date Added</TableHead>
              <TableHead className="text-[12px] font-black uppercase text-slate-500 tracking-wider text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-400 font-bold uppercase text-[11px] tracking-widest">
                  Synchronizing Team Directory...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-400 font-bold uppercase text-[11px] tracking-widest">
                  No team members found
                </TableCell>
              </TableRow>
            ) : filteredUsers.map((u) => (
              <TableRow key={u.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3 py-1">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200 uppercase">
                      {u.name?.charAt(0) || u.email?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[13px] text-slate-700">{u.name || "Operator"}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{u.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Shield className={cn("w-3.5 h-3.5", u.role === 'admin' ? 'text-primary' : 'text-slate-400')} />
                    <span className="text-[12px] font-bold text-slate-600 uppercase tracking-tight">{u.role || "staff"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-[#22c55e] text-white hover:bg-[#22c55e] border-none rounded-md px-2 py-0.5 font-bold text-[10px] uppercase tracking-wider">
                    {u.status || 'Active'}
                  </Badge>
                </TableCell>
                <TableCell className="text-[13px] text-slate-500 font-medium">{new Date(u.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-1">
                    <Button size="icon" variant="ghost" className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded">
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
